import FooterLinks from '@/components/mollecules/FooterLinks'

import { APP_ROUTE } from '@/constant/route'
import { socialMedia } from '@/constant/socialMedia'

import clsx from 'clsx'

const Footer = () => {
  const ownwer = process.env.NEXT_PUBLIC_OWNER_NAME
  return (
    <footer className={clsx('mt-20 pt-10 pb-6 w-full border-t', 'border-main-2 dark:border-main-3')}>
      <section className='flex items-stretch gap-8 w-full'>
        <FooterLinks data={APP_ROUTE} />
        <FooterLinks data={socialMedia} />
      </section>
      <section className='mt-10'>
        <p className='text-sm'>
          &copy; 2022 - {new Date().getFullYear()} {ownwer}
        </p>
      </section>
    </footer>
  )
}

export default Footer
