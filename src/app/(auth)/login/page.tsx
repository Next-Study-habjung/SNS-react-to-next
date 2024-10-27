"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTransition } from "react"
import { FullScreen } from "@/components/spinner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "이메일은 필수값입니다!",
    })
    .email({ message: "유효하지 않은 이메일 형식입니다!" }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6 자리 이상 입력해야 합니다!",
  }),
})

export default function LoginPage() {
  const { push } = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const res = await fetch("/api/login")
      console.log("로그인 시도~~")
    })
  }

  const onCredentialSubmit = async (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {})
  }
  return (
    <div>
      {/* {isPending && <FullScreen />} */}
      <h1 className="flex justify-center mt-[54px] mb-[40px] text-2xl font-semibold">
        로그인
      </h1>
      <div className="mx-[34px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      className="block w-full border-b-[1px] focus:outline-none  border-[#767676] focus:border-b-[#F26E22]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      className="block w-full border-b-[1px] focus:outline-none  border-[#767676] focus:border-b-[#F26E22]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={`w-full rounded-full ${form.formState.isValid ? "bg-[#F26E22] hover:bg-[#F26E22]" : "bg-[#F26E22]/50"}`}
              disabled={!form.formState.isValid}
              type="submit">
              로그인
            </Button>
          </form>
        </Form>
        <p
          className="flex justify-center mt-4 text-xs"
          onClick={() => {
            push("signup")
          }}>
          이메일로 회원가입
        </p>
      </div>
    </div>
  )
}
