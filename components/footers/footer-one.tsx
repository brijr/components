"use client";

import { Section, Container } from "../craft";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import { Github, Twitter, Facebook } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Footer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <footer>
      <Section>
        <Container className="grid gap-6">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>
                brijr/components is a collection of Next.js, React, Typescript
                components for building landing pages and websites.
              </Balancer>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Github />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook />
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 not-prose"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscribe for Company Updates</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="example@fjord.dev"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Lorem ipsum dolor sit amet.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Container>
        <Container className="border-t not-prose md:flex justify-between items-center text-sm">
          <div className="flex flex-col md:flex-row mb-6 md:mb-0 gap-4 underline underline-offset-4 decoration-muted">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <p className="text-muted-foreground">
            © <a href="https://github.com/brijr/components">brijr/components</a>
            . All rights reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
