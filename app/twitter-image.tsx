import { shareImage } from "@/lib/brand";

export const alt = "The Gita and the Gospel: a study guide for apologetics, evangelism and discipleship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return shareImage();
}
