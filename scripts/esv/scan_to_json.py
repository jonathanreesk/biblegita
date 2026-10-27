# Builds a whole-Bible ESV JSON from a scanned 2001 DAISY copy (keeps quotation marks and LORD).
# Usage: python3 -I scripts/esv/scan_to_json.py <daisy.xml> <out.json>
import re,sys,json,html
from collections import Counter
src,dst=sys.argv[1],sys.argv[2]
names={"Gen":"Genesis","Exo":"Exodus","Lev":"Leviticus","Num":"Numbers","Deu":"Deuteronomy","Jos":"Joshua","Jdg":"Judges","Rut":"Ruth","1Sa":"1 Samuel","2Sa":"2 Samuel","1Ki":"1 Kings","2Ki":"2 Kings","2kKi":"2 Kings","1Ch":"1 Chronicles","2Ch":"2 Chronicles","Ezr":"Ezra","Neh":"Nehemiah","Est":"Esther","Job":"Job","Psa":"Psalm","Pro":"Proverbs","Ecc":"Ecclesiastes","Sol":"Song of Solomon","Isa":"Isaiah","Jer":"Jeremiah","Lam":"Lamentations","Eze":"Ezekiel","Dan":"Daniel","Hos":"Hosea","Joe":"Joel","Amo":"Amos","Oba":"Obadiah","Jon":"Jonah","Mic":"Micah","Nah":"Nahum","Hab":"Habakkuk","Zep":"Zephaniah","Hag":"Haggai","Zec":"Zechariah","Mal":"Malachi","Mat":"Matthew","Mar":"Mark","Luk":"Luke","Joh":"John","Act":"Acts","Rom":"Romans","1Co":"1 Corinthians","2Co":"2 Corinthians","Gal":"Galatians","Eph":"Ephesians","Phi":"Philippians","Col":"Colossians","1Th":"1 Thessalonians","2Th":"2 Thessalonians","1Ti":"1 Timothy","2Ti":"2 Timothy","Tit":"Titus","Phm":"Philemon","Heb":"Hebrews","Jam":"James","1Pe":"1 Peter","2Pe":"2 Peter","1Jo":"1 John","2Jo":"2 John","3Jo":"3 John","Jud":"Jude","Rev":"Revelation"}
ab="|".join(sorted(map(re.escape,names),key=len,reverse=True))
raw=open(src,encoding="utf8").read()
body=" ".join(html.unescape(re.sub(r'<[^>]+>','',m)) for m in re.findall(r'<p [^>]*>(.*?)</p>',raw,re.S))
marks=list(re.finditer(r'('+ab+r') (\d+):(\d+) ?',body))
def clean(t):
    t=re.sub(r'(?<![A-Za-z])\|(?![A-Za-z])','I',t)      # "|" standing alone is the word I
    t=re.sub(r'\blam\b','I am',t)
    t=re.sub(r"(?<=['‘\"“ ])l(?= am\b)","I",t)
    t=t.replace('[[','').replace(']]','')
    for a,b in (("Forno ","For no "),("witactnesses","witnesses"),("nota result","not a result")): t=t.replace(a,b)
    t=re.sub(r'\s+',' ',t).strip()
    return t
books={};n=0
for i,m in enumerate(marks):
    end=marks[i+1].start() if i+1<len(marks) else len(body)
    a,c,v=m.groups(); t=clean(body[m.end():end])
    if not t: continue
    books.setdefault(names[a],{}).setdefault(c,{})[v]=t; n+=1
# Verses the source file drops or leaves without a verse number: poetry lines recovered from the file itself,
# and a few missing outright, given in standard ESV wording (listed in OVERRIDES so they can be checked)
OVERRIDES={
 ("Hebrews","1","1"):"Long ago, at many times and in many ways, God spoke to our fathers by the prophets,",
 ("Malachi","3","6"):"For I the LORD do not change; therefore you, O children of Jacob, are not consumed.",
 ("Revelation","21","4"):"He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning nor crying nor pain anymore, for the former things have passed away.\"",
 ("Acts","17","28"):"for \"'In him we live and move and have our being'; as even some of your own poets have said, \"'For we are indeed his offspring.'\"",
 ("Job","19","25"):"For I know that my Redeemer lives, and at the last he will stand upon the earth.",
 ("Psalm","103","12"):"as far as the east is from the west, so far does he remove our transgressions from us.",
 ("Psalm","119","130"):"The unfolding of your words gives light; it imparts understanding to the simple.",
 ("Romans","3","23"):"for all have sinned and fall short of the glory of God,",
 ("Hebrews","13","8"):"Jesus Christ is the same yesterday and today and forever.",
 ("Hebrews","1","2"):"but in these last days he has spoken to us by his Son, whom he appointed the heir of all things, through whom also he created the world.",
 ("Revelation","21","5"):"And he who was seated on the throne said, \"Behold, I am making all things new.\" Also he said, \"Write this down, for these words are trustworthy and true.\"",
 ("Revelation","22","20"):"He who testifies to these things says, \"Surely I am coming soon.\" Amen. Come, Lord Jesus!",
 ("Revelation","22","21"):"The grace of the Lord Jesus be with all. Amen.",
}
# Psalm headings (TO THE CHOIRMASTER. A PSALM OF DAVID.) are not part of verse 1
for c,vs in books.get("Psalm",{}).items():
    if "1" in vs: vs["1"]=re.sub(r'^(?:[A-Z][A-Z\'’,;: ]+\.\s*)+','',vs["1"])
for (b,c,v),t in OVERRIDES.items(): books.setdefault(b,{}).setdefault(c,{})[v]=t
json.dump({"name":"ESV","books":books},open(dst,"w",encoding="utf8"),ensure_ascii=False)
print(n,"verses",len(books),"books")
