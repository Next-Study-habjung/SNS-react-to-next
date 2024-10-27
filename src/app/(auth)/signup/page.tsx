"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// 첫 번째 단계 Zod 스키마
const FirstStepSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일은 필수값입니다!" })
    .email({ message: "유효하지 않은 이메일 형식입니다!" }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6 자리 이상 입력해야 합니다!" }),
})

// 두 번째 단계 Zod 스키마
const SecondStepSchema = z.object({
  username: z.string().min(1, { message: "사용자 이름은 필수값입니다!" }),
  accountId: z.string().min(1, { message: "계정 ID는 필수값입니다!" }),
  introduction: z.string().optional(), // 소개는 선택적
})

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition()
  const [step, setStep] = useState(1)
  // 첫 번째 단계와 두 번째 단계에 따른 두 개의 useForm 훅 생성
  const firstStepForm = useForm({
    resolver: zodResolver(FirstStepSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const secondStepForm = useForm({
    resolver: zodResolver(SecondStepSchema),
    defaultValues: {
      username: "",
      accountId: "",
      introduction: "",
    },
  })

  const [imageSrc, setImageSrc] = useState<string | null>(null) // 업로드된 이미지의 상태

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string) // 이미지 미리보기 설정
      }
      reader.readAsDataURL(file) // 파일을 data URL로 읽음
    }
  }

  const onSubmit = (values: any) => {
    // 단계에 따라 처리
    if (step === 1) {
      setStep(2) // 다음 단계로
    } else {
      startTransition(async () => {
        const fullValues = {
          ...firstStepForm.getValues(),
          ...values,
        }
        console.log("회원가입 정보:", fullValues)
      })
    }
  }

  return (
    <div>
      {/* {isPending && <FullScreen />} */}
      {step === 1 ? (
        <div>
          <h1 className="flex justify-center mt-[54px] mb-[40px] text-2xl font-semibold">
            이메일로 회원가입
          </h1>
          <div className="mx-[34px]">
            <Form {...firstStepForm}>
              <form
                onSubmit={firstStepForm.handleSubmit(onSubmit)}
                className="space-y-8">
                <FormField
                  control={firstStepForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          placeholder="이메일을 입력해주세요"
                          className="block w-full border-b-[1px] focus:outline-none border-[#767676] focus:border-b-[#F26E22]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={firstStepForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="비밀번호를 입력해주세요"
                          className="block w-full border-b-[1px] focus:outline-none border-[#767676] focus:border-b-[#F26E22]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className={`w-full rounded-full ${firstStepForm.formState.isValid ? "bg-[#F26E22] hover:bg-[#F26E22]" : "bg-[#F26E22]/50"}`}
                  disabled={!firstStepForm.formState.isValid}>
                  다음
                </Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="flex justify-center mt-[54px] text-2xl font-semibold">
            프로필 설정
          </h1>
          <p className="w-fit m-auto mb-8">
            나중에 언제든지 변경할 수 있습니다.
          </p>

          <div className="relative w-fit m-auto mb-8">
            {/* 프로필 이미지 미리보기 */}
            <Image
              src={imageSrc || "/assets/Ellipse-1.png"} // 업로드된 이미지가 없으면 기본 이미지 사용
              width="110"
              height="110"
              alt="프로필 미리보기 이미지"
              className="rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload" // 파일 입력의 ID
            />
            {/* 파일 업로드 아이콘 클릭 시 파일 선택 */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer absolute bottom-0 right-0">
              <Image
                src="/assets/upload-file.png"
                width="36"
                height="36"
                alt="upload-file 이미지"
                className=""
              />
            </label>
          </div>
          <Form {...secondStepForm}>
            <form
              onSubmit={secondStepForm.handleSubmit(onSubmit)}
              className="space-y-8 mx-[34px]">
              <FormField
                control={secondStepForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사용자 이름</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="사용자 이름을 입력해주세요"
                        className="block w-full border-b-[1px] focus:outline-none border-[#767676] focus:border-b-[#F26E22]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={secondStepForm.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>계정 ID</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="계정 ID를 입력해주세요"
                        className="block w-full border-b-[1px] focus:outline-none border-[#767676] focus:border-b-[#F26E22]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={secondStepForm.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>소개</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="자신을 소개해주세요 (선택)"
                        className="block w-full border-b-[1px] focus:outline-none border-[#767676] focus:border-b-[#F26E22]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className={`w-full rounded-full ${secondStepForm.formState.isValid ? "bg-[#F26E22] hover:bg-[#F26E22]" : "bg-[#F26E22]/50"}`}
                disabled={!secondStepForm.formState.isValid}>
                회원가입 완료
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}
