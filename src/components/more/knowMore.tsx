import PathDrawing from "../random/path.";



export default function KnowMore() {
    return (
        <div className="bg-gray-100  py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-center text-base/7 font-semibold text-indigo-600">META LEARN</h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Empower Learning – Build, Explore, Succeed!"</p>
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-2 items-center justify-center">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Providing everything for your need.</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
                            </div>
                            <div className="flex justify-center items-center py-8 px-8">
                                <PathDrawing/>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Track your Performance</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.</p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                <img className="w-full max-lg:max-w-xs" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
                            </div>
                            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                <img className="h-[min(152px,40cqw)] object-cover" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}