import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { HeroHeader } from "@/components/header"
import { ChevronRight } from 'lucide-react'
import { TextLoopBasic } from './layout/tesxt-loop-role'

const heroImage = '/src/assets/mist/tailark.png'
const navLinks = [
    { name: "Get Started", to: "#link" },
    { name: "Watch Video", to: "#link" },
]

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="text-center md:text-start overflow-hidden">
                <section className="bg-linear-to-b to-muted from-background">
                    <div className="relative py-36">
                        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
                            <div className="md:w-1/2">
                                <div className='items-center md:items-start'>
                                    <h1 className="max-w-md text-balance text-5xl font-bold md:text-6xl tracking-widest leading-[1.5]"
                                    >
                                        Web<span className="text-[#fa0707]">3</span>Bridge CXIII DAO
                                    </h1>
                                    <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">
                                        <TextLoopBasic />
                                    </p>

                                    <div className="flex items-center justify-center gap-3">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="pr-4.5">
                                            <Link to={navLinks[0].to}>
                                                <span className="text-nowrap md:px-3">join The Team</span>
                                                <ChevronRight className="opacity-50" />
                                            </Link>
                                        </Button>
                                        {/* <Button
                                            key={2}
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="pl-5">
                                            <Link to={navLinks[1].to}>
                                                <CirclePlay className="fill-primary/25 stroke-primary" />
                                                <span className="text-nowrap">Watch video</span>
                                            </Link>
                                        </Button> */}
                                    </div>
                                </div>

                                <div className="mt-20 md:mt-10">
                                    <p className="text-muted-foreground text-start">Used by teams at :</p>
                                    <div className="flex justify-center items-center mt-6 max-w-sm gap-10">
                                        
                                        <div className="flex">
                                            <img
                                                className="h-5 w-fit dark:invert"
                                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                                alt="Nvidia Logo"
                                                height="20"
                                                width="auto"
                                            />
                                        </div>
                                        <div className="flex">
                                            <img
                                                className="h-4 w-fit dark:invert"
                                                src="https://html.tailus.io/blocks/customers/column.svg"
                                                alt="Column Logo"
                                                height="16"
                                                width="auto"
                                            />
                                        </div>
                                        <div className="flex">
                                            <img
                                                className="h-4 w-fit dark:invert"
                                                src="https://html.tailus.io/blocks/customers/github.svg"
                                                alt="GitHub Logo"
                                                height="16"
                                                width="auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block perspective-near mt-24 translate-x-4 md:absolute md:-right-[16] md:bottom-16 md:left-1/2 md:top-70 md:mt-0 md:translate-x-0">
                            <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-9 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+0.5rem)] before:border">
                                <div className="bg-background rounded-[calc(var(--radius)+0.5rem)] shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-29 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                                    <img
                                        src={heroImage}
                                        alt="app screen"
                                        width="28"
                                        height="18"
                                        className="object-top-left size-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}