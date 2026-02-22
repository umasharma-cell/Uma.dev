import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { api, type ContactInput } from "@shared/routes";
import { useContact } from "@/hooks/use-portfolio";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const contactMutation = useContact();

  const form = useForm<ContactInput>({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ContactInput) {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <AnimatedBackground />

      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-12">
              I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-8">
              <ContactItem 
                icon={<Mail className="w-6 h-6 text-primary" />}
                title="Email"
                value="work.uma26@gmail.com"
                href="mailto:work.uma26@gmail.com"
              />
              <ContactItem 
                icon={<MapPin className="w-6 h-6 text-primary" />}
                title="Location"
                value="Bangalore, India"
              />
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary/20 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="bg-background/50 border-white/10 h-12 focus:border-primary text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-background/50 border-white/10 h-12 focus:border-primary text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Hello, I'd like to discuss..." 
                          {...field} 
                          className="bg-background/50 border-white/10 min-h-[150px] focus:border-primary text-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/25"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                  {!contactMutation.isPending && <Send className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href?: string }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="p-4 bg-secondary rounded-full group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
        <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block w-fit">{content}</a>;
  }
  return content;
}
