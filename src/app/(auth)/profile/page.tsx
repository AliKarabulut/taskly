import getUserInformation from '@/actions/get-user-information'
import UserInformationList from '@/components/user-information-list'

const SignOut = async () => {
  const user = await getUserInformation()

  return (
    <section id="profile">
      <ul className="mx-auto flex max-w-lg flex-col gap-2 rounded-lg border border-gray-100 px-6 py-3 shadow-lg">
        {user && Object.entries(user).map(([key, value]) => <UserInformationList key={key} name={key} value={value} />)}
      </ul>
    </section>
  )
}

export default SignOut
