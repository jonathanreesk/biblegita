# Merges the ESV 2011 text (lguenth/mdbible json/ESV.json) with quotation marks, LORD and psalm-heading fixes from the scanned copy.
# Usage: python3 -I scripts/esv/merge_2011.py <ESV.json> <scan.json> data/esv/esv-all.json
import json,re,sys,difflib
src2011,daisy,dst=sys.argv[1],sys.argv[2],sys.argv[3]
J=json.load(open(src2011))["books"]
D=json.load(open(daisy))["books"]   # 2001 text from the scan, which keeps quotation marks
name={"Psalms":"Psalm","Song of Songs":"Song of Solomon","Revelation of John":"Revelation"}
def fixname(b):
    m=re.match(r"^(III|II|I) (.+)$",b)
    return f"{len(m.group(1))} {m.group(2)}" if m else name.get(b,b)
ATTACH=re.compile(r"^[,.;:?!)\]’”'—-]")
def join(tokens):
    out=""
    for t in tokens:
        s=t[0]
        if not out: out=s
        elif ATTACH.match(s) or out.endswith(("(","[","—","“","‘")): out+=s
        else: out+=" "+s
    return re.sub(r"\s+"," ",out).strip()
W=re.compile(r"[A-Za-z0-9]+(?:[’'][a-z]+)?")
def carry_quotes(plain,scan):
    """Copy the quotation marks of the scanned 2001 verse onto the same words of the 2011 verse."""
    pw=[(m.start(),m.end(),m.group().lower()) for m in W.finditer(plain)]
    sw=[(m.start(),m.end(),m.group().lower()) for m in W.finditer(scan)]
    sm=difflib.SequenceMatcher(None,[x[2] for x in sw],[x[2] for x in pw],autojunk=False)
    mp={}
    for a,b,n in sm.get_matching_blocks():
        for k in range(n): mp[a+k]=b+k
    # LORD and GOD (the divine name, printed in small capitals) are lowercased in the 2011 data
    for a_,b_ in mp.items():
        sw0,sw1,_=sw[a_]; p0,p1,_=pw[b_]
        if scan[sw0:sw1] in ("LORD","GOD") and plain[p0:p1].lower()==scan[sw0:sw1].lower():
            plain=plain[:p0]+scan[sw0:sw1]+plain[p1:]
    ins=[]
    for m in re.finditer(r'["“”‘’]',scan):
        i,c=m.start(),m.group()
        before=scan[i-1] if i>0 else " "; after=scan[i+1] if i+1<len(scan) else " "
        if c in "’'" and before.isalpha() and after.isalpha(): continue      # apostrophe inside a word
        opening = c in "“‘" or (c in "\"'" and (before in " (—-\"'“‘" or i==0) and (after.isalnum() or after in "\"'‘“"))
        if opening:
            nxt=[k for k,w in enumerate(sw) if w[0]>i]
            if nxt and nxt[0] in mp: ins.append((pw[mp[nxt[0]]][0],c,0))
        else:
            if c in "’'" and before=="s" and after==" ": continue          # plural possessive, e.g. brothers'
            prv=[k for k,w in enumerate(sw) if w[1]<=i]
            if prv and prv[-1] in mp:
                p1=pw[mp[prv[-1]]][1]
                p1+=re.match(r'^[,.;:?!]*',plain[p1:]).end()
                ins.append((p1,c,1))
    out=plain
    for pos,c,_ in sorted(ins,key=lambda x:(x[0],x[2]),reverse=True):
        out=out[:pos]+c+out[pos:]
    return out
books={};n=0;q=0
for b,chs in J.items():
    bn=fixname(b)
    for ci,ch in enumerate(chs,1):
        for vi,v in enumerate(ch,1):
            t=join(v)
            if not t: continue
            s=D.get(bn,{}).get(str(ci),{}).get(str(vi))
            if s and bn=="Psalm" and vi==1:
                # drop the section heading and superscription the 2011 data puts before verse 1
                first=" ".join(w.lower() for w in W.findall(s)[:3])
                words=[(m.start(),m.group().lower()) for m in W.finditer(t)]
                starts=[words[k][0] for k in range(len(words)-2) if " ".join(x[1] for x in words[k:k+3])==first]
                if starts: t=t[min(starts,key=lambda p:abs(len(t)-p-len(s))):]
            t=t.replace("[[","").replace("]]","").strip()
            if s:
                t2=carry_quotes(t,s)
                if t2!=t: q+=1
                t=t2
            books.setdefault(bn,{}).setdefault(str(ci),{})[str(vi)]=t; n+=1
json.dump({"name":"ESV","edition":"2011","books":books},open(dst,"w"),ensure_ascii=False)
print(n,"verses;",q,"with quotation marks restored;",len(books),"books")
