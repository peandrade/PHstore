import Image from "next/image";
import Link from "next/link";
import { FooterButton } from "./footer-button";
import { MenuItem } from "@/types/menu-item";

export const Footer = () => {
    const menu: MenuItem[] = [
        { label: 'Camisas', href: '/categories/camisas' },
        { label: 'Kits', href: '/categories/kits' }
    ];
    return (
        <footer>
            <div className="bg-white border-t border-gray-200 px-6 py-14">
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src={'/assets/ui/mail-send-line.png'}
                        alt="Newsletter icon"
                        width={68}
                        height={68}
                    />
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-2xl mb-6 md:mb-2">Fique por dentro das promoções</h3>
                        <p className="text-gray-400">Coloque seu e-mail e seja o primeiro a saber</p>
                    </div>
                    <form method="POST" className="w-full flex-1 flex flex-col gap-4 md:flex-row" aria-label="Newsletter subscription form">
                        <input
                            type="email"
                            name="email"
                            className="flex-1 border border-gray-200 rounded-sm px-6 py-5 outline-0"
                            placeholder="Qual seu e-mail?"
                            aria-label="Digite seu e-mail"
                            required
                        />
                        <input
                            type="submit"
                            value="Enviar"
                            className="w-full md:w-50 px-6 py-5 bg-blue-600 text-white border-0 rounded-sm cursor-pointer hover:bg-blue-700 transition-colors"
                        />
                    </form>
                </div>
            </div>
            <div className="bg-black text-white">
                <div className="w-full max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-16 md:py-10 border-b border-gray-700">
                        <Link href="/" aria-label="Go to homepage">
                            <Image
                                src={'/assets/ui/logo-white.png'}
                                alt="PHStore logo"
                                width={143}
                                height={48}
                            />
                        </Link>
                        <nav aria-label="Footer navigation">
                            <ul className="flex flex-col md:flex-row gap-8 items-center">
                                {menu.map((item) => (
                                    <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 py-16 md:py-10 border-b border-gray-700">
                        <div className="flex-1">
                            <h4 className="mb-6 text-center md:text-left">Precisa de ajuda?</h4>
                            <div className="flex flex-col md:flex-row gap-6">
                                <FooterButton
                                    href="mailto:suporte@phstore.com.br"
                                    icon="/assets/ui/mail-line.png"
                                    label="suporte@phstore.com.br"
                                    ariaLabel="Send email to support"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/ui/phone-line.png"
                                    label="(11) 99999-9999"
                                    ariaLabel="Phone contact"
                                />
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-6 text-center md:text-left">Acompanhe nas redes sociais</h4>
                            <div className="flex flex-row justify-between gap-6">
                                <FooterButton
                                    href=""
                                    icon="/assets/ui/instagram-line.png"
                                    ariaLabel="Follow us on Instagram"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/ui/linkedin-line.png"
                                    ariaLabel="Follow us on LinkedIn"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/ui/facebook-line.png"
                                    ariaLabel="Follow us on Facebook"
                                />
                                <FooterButton
                                    href=""
                                    icon="/assets/ui/twitter-x-fill.png"
                                    ariaLabel="Follow us on X (Twitter)"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-14 justify-between items-center py-16 md:py-10">
                        <div className="text-xl text-center md:text-left">
                            Se você leu isso aqui, saiba que está no caminho certo!<br />
                            Continue estudando e você chegará lá...
                        </div>
                        <div className="flex justify-center">
                            <FooterButton
                                href="/"
                                icon="/assets/ui/arrow-up-line.png"
                                ariaLabel="Back to top"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}