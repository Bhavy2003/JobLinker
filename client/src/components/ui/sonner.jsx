import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg p-2 rounded-full", // Added rounded-full here
          description: "group-[.toast]:text-muted-foreground p-2 rounded-full", // Added rounded-full here
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground p-2 rounded-full", // Added rounded-full here
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground p-2 rounded-full", // Added rounded-full here
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
