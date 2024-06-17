import React, { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "@/schemas";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Link from "next/link";
import { generateVerificationToken } from "@/actions/verification-token";
import { createUser } from "@/actions/create-user";

export function ProfileForm({ className }: { className?: string }) {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      newsSubscription: false,
      firstName: "",
      lastName: "",
      company: "",
      jobTitle: "",
      companySize: "",
      industry: "",
      confirmationCode: "",
    },
  });

  const handleSendOTP = async () => {
    try {
      const isValid = await form.trigger(["email", "password"]);
      if (isValid) {
        generateVerificationToken(form.getValues("email"));
        setStep(2);
      } else {
        setError(error);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createUser(values)
        .then((data) => {
          console.log("User creation response:", data);
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          setError("Error creating user" + error);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {step === 1 && (
          <>
            <h2 className="text-[1.5rem] font-semibold">
              Start your 14-days free trial
            </h2>
            <p>
              You&apos;re one step closer to delivering exceptional service at scale.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="you@company.com"
                      {...field}
                    />
                  </FormControl>
                  {error ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      It&apos;s best to sign up with your work email
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isPending}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  {error ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>6 characters minimum</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="newsSubscription"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-gray-600 dark:text-gray-300">
                      <span className="text-gray-800 dark:text-violet-500 font-semibold">
                        I do not want
                      </span>{" "}
                      to receive product updates and news about services
                    </FormLabel>
                  </FormItem>
                )}
              />

              <h3 className="text-sm text-gray-600 dark:text-gray-300">
                By signing up, you agree with our{" "}
                <Link
                  className="text-gray-800 dark:text-violet-500 font-semibold"
                  href="/"
                >
                  Services Agreement
                </Link>{" "}
                and{" "}
                <Link
                  className="text-gray-800 dark:text-violet-500 font-semibold"
                  href="/"
                >
                  Privacy policy
                </Link>
              </h3>
            </div>

            <div className="w-full flex justify-end">
              <Button onClick={handleSendOTP}>Next</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-[1.5rem] font-semibold">Almost there!</h2>
            <p>Help us personalize our experience to your needs.</p>
            <div className="flex justify-between items-center space-x-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="Smith"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center space-x-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="Your company"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="e.g., Marketing Officer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center space-x-2">
              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Company size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-10">2-10</SelectItem>
                        <SelectItem value="10-50">10-50</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100 and more">
                          More than 100
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Tourism">Tourism</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col justify-center">
              <FormField
                control={form.control}
                name="confirmationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code</FormLabel>
                    <p className="text-gray-500 dark:text-gray-300">
                      We sent you a verification code to your email address.{" "}
                      <br />
                      Code will expire in 10 minutes.
                    </p>
                    <FormControl className="flex justify-normal items-center">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="w-full flex justify-end">
              <Button type="submit">Start trial</Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
