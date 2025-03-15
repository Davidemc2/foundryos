
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

interface BuildEmailFormProps {
  onSubmit: (email: string) => void;
}

export const BuildEmailForm: React.FC<BuildEmailFormProps> = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.email);
  };

  return (
    <div className="mb-4 mt-2 animate-fadeIn">
      <div className="mb-3 text-center text-gray-300">
        <p>Ready to build this? Enter your email to continue:</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    className="bg-gray-800 border-gray-700 text-white focus-visible:ring-violet-500"
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full gap-2 py-6 bg-violet-600 hover:bg-violet-700 transition-all btn-glow"
          >
            Send to Builder
            <Mail size={16} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
