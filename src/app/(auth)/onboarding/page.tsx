"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { RiKakaoTalkFill } from "react-icons/ri"
import { FaGoogle } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
export default function OnboardingPage() {
  const { push } = useRouter()
  return (
    <>
      <div className="w-full h-96 bg-[#EA7F42] flex justify-center items-center">
        <Image
          src={"/assets/symbol-logo-W.png"}
          width={144}
          height={144}
          alt="로고 이미지"
        />
      </div>

      <div className="rounded-tl-2xl rounded-tr-2xl flex flex-col pt-12 pl-8 pr-8 mb-2 gap-2">
        <div className="flex justify-between border-solid border-2 border-[#F2C94C] rounded-full items-center pl-2">
          <div className="w-6 h-6">
            <Image
              width={100}
              height={100}
              src="/assets/message-circle.png"
              alt="카카오톡 이미지"
            />
          </div>
          <Button className="flex-1" variant="ghost">
            카카오톡 계정으로 로그인
          </Button>
        </div>

        <div className="flex justify-between border-solid border-2 border-[#767676] rounded-full items-center pl-2">
          <div className="w-6 h-6">
            <Image
              width={100}
              height={100}
              src="/assets/google.png"
              alt="구글 이미지"
            />
          </div>
          <Button className="flex-1" variant="ghost">
            구글 계정으로 로그인
          </Button>
        </div>

        <div className="flex border-solid border-2 border-[#2D9CDB] rounded-full items-center pl-2">
          <div className="w-6 h-6">
            <Image
              width={100}
              height={100}
              src="/assets/facebook.png"
              alt="페이스북 이미지"
            />
          </div>
          <Button className="flex-1" variant="ghost">
            페이스북 계정으로 로그인
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button
          variant="ghost"
          className="text-[#555555] inline"
          size="sm"
          onClick={() => {
            push("/login")
          }}>
          이메일로 로그인
        </Button>
        <div className="border-l border-[#c4c4c4] mx-1 h-4" />
        <Button
          variant="ghost"
          className="text-[#555555] inline"
          size="sm"
          onClick={() => {
            push("/signup")
          }}>
          회원가입
        </Button>
      </div>
    </>
  )
}
