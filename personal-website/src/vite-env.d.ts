/// <reference types="vite/client" />

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.md" {
  const content: string;
  export default content;
}
declare module "*.pdf";