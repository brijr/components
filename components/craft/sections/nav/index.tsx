import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavMenu } from './nav-menu';
import { MobileNav } from './mobile-nav';

type NavProps = {
	className?: string;
	children?: React.ReactNode;
	id?: string;
};

const Nav = ({ className, children, id }: NavProps) => {
	return (
		<nav
			className={cn('sticky z-50 top-0 bg-background', 'border-b drop-shadow-sm', className)}
			id={id}
		>
			<div
				id="nav-container"
				className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
			>
				<Link className="hover:opacity-75 transition-all" href="/">
					<h2 className="sr-only">Craft UI</h2>
					<Image className="dark:invert" src={Logo} alt="Logo" width={72} height={48}></Image>
				</Link>
				{children}
				<div className="flex items-center gap-2">
					<NavMenu />
					<Button asChild>
						<Link href="https://github.com/9d8dev/craft">Get Started</Link>
					</Button>
					<MobileNav />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
