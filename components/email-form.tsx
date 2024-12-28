"use client";

// ! MAKE SURE TO CHANGE THE SOURCE AND USER GROUP
const source = "https://components.work";
const userGroup = "Components";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";

import useMeasure from "react-use-measure";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const transition = { type: "ease", ease: "easeInOut", duration: 0.4 };

export function EmailForm({ label }: { label?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, bounds] = useMeasure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          source: source,
          userGroup: userGroup,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      const data = await response.json();
      console.log("Submitted email:", values.email, "Contact ID:", data.id);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      form.setError("email", {
        type: "manual",
        message: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MotionConfig transition={transition}>
      <div>
        <motion.div
          animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
        >
          <div ref={ref}>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  exit={{ opacity: 0 }}
                  transition={{
                    ...transition,
                    duration: transition.duration / 2,
                  }}
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input
                                  placeholder="dieter.rams@gmail.com"
                                  {...field}
                                />
                              </FormControl>
                              <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: isLoading ? 0.5 : 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Button
                                  className={cn("w-[98.52px]")}
                                  type="submit"
                                  disabled={isLoading}
                                >
                                  <motion.span
                                    initial={false}
                                    animate={{
                                      opacity: isLoading ? 0 : 1,
                                      y: isLoading ? 10 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    Subscribe
                                  </motion.span>
                                  <motion.span
                                    initial={false}
                                    animate={{
                                      opacity: isLoading ? 1 : 0,
                                      y: isLoading ? 0 : -10,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                      position: "absolute",
                                      display: "inline-block",
                                    }}
                                  >
                                    •••
                                  </motion.span>
                                </Button>
                              </motion.div>
                            </div>
                            <FormDescription>
                              Subscribe for component updates.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ...transition,
                    duration: transition.duration / 2,
                  }}
                >
                  <p className="text-sm">Thank you for subscribing.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
