import AuthForm from '@/components/auth/auth.form'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center">
      <AuthForm isLogin={false} />
    </div>
  )
}
