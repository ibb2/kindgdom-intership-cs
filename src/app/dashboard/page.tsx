"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  message: z.string().min(1),
  userId: z.string(),
});

export default function Dashboard() {
  const [messages, setMessages] = React.useState([]);

  const userId = React.useId();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      userId: userId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/webhook", {
      method: "POST",
      body: JSON.stringify(values),
    });

    console.log(values);
  }

  React.useEffect(() => {
    async function pollWebhook() {
      const res = await fetch("/api/webhook");
      const data = await res.json();
      const arr = data.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedContent = arr.map((item: { content: any }) => {
        try {
          return JSON.parse(item.content);
        } catch (error) {
          console.error("Failed to parse content:", error);
          return null;
        }
      });

      setMessages(parsedContent);
    }

    setTimeout(() => {
      pollWebhook();
    }, 1000);
  });

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-full gap-8">
      <Card className="w-[380px]">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My name" {...field} />
                    </FormControl>
                    <FormDescription>Please enter your name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input placeholder="A meaningful message" {...field} />
                    </FormControl>
                    <FormDescription>
                      What message do you want to send?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder={userId} {...field} readOnly />
                    </FormControl>
                    <FormDescription>User Id</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {messages.length > 0 && (
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>Latest Messages (10)</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.reverse().map(
              (
                message: {
                  message: string;
                  userId: string;
                  name: string;
                },
                index,
              ) => {
                return (
                  <div key={index} className="flex flex-col mb-4">
                    <div className="flex flex-row w-full justify-between">
                      <p className="font-semibold">{message.name}</p>
                      <p className="text-sm">{message.userId}</p>
                    </div>
                    <p>{message.message}</p>
                  </div>
                );
              },
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
