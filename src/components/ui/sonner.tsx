import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-slate-900 text-white border border-slate-800 shadow-lg",
          description: "text-slate-400",
          actionButton: "bg-blue-600 text-white",
          cancelButton: "bg-slate-700 text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };