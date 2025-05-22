
const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-center gap-2 text-center px-4">
        <p className="text-sm text-muted-foreground">
          Proudly created by{" "}
          <a
            href="https://scaleplus.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            scaleplus.io
          </a>
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Scale<sup>+</sup> Caption. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
