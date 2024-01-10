import GitHubIcon from '../icons/github'
import InstagramIcon from '../icons/instagram'
import LinkedInIcon from '../icons/linkedin'
LinkedInIcon
const navigation = [
  {
    name: 'Linkedin',
    href: 'https://www.linkedin.com/in/karabulutali/',
    icon: <LinkedInIcon />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/AliKarabulut',
    icon: <GitHubIcon />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/knospak/',
    icon: <InstagramIcon />,
  },
]

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map(item => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">&copy; 2020 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
