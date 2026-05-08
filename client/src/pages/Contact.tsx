import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
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
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data: ContactInput) {
    contactMutation.mutate(data, { onSuccess: () => form.reset() });
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <AnimatedBackground />

      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            >
              Let's connect
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Touch
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12">
              I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ x: 8 }}
              >
                <a href="mailto:work.uma26@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-4 bg-secondary/50 rounded-xl border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground font-medium">Email</h3>
                    <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">work.uma26@gmail.com</p>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ x: 8 }}
              >
                <div className="flex items-center gap-4 group">
                  <div className="p-4 bg-secondary/50 rounded-xl border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground font-medium">Location</h3>
                    <p className="text-lg font-semibold text-foreground">Bangalore, India</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="bg-secondary/20 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors duration-500 shadow-xl"
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
                          className="bg-background/50 border-white/10 h-12 focus:border-primary text-lg rounded-xl transition-colors"
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
                          className="bg-background/50 border-white/10 h-12 focus:border-primary text-lg rounded-xl transition-colors"
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
                          className="bg-background/50 border-white/10 min-h-[150px] focus:border-primary text-lg resize-none rounded-xl transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-purple-500 hover:shadow-lg hover:shadow-primary/25 transition-all"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                    {!contactMutation.isPending && <Send className="ml-2 w-5 h-5" />}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
