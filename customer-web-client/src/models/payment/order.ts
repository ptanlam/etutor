export interface Order {
  id: string;
  status: string;
  links: { href: string; rel: string; method: string }[];
}
