
export default function LandingPage() {
    return (
        <div className="flex flex-col items-center w-full h-full mt-10">
            <div className="flex w-full justify-center">
                <div className="flex flex-col w-3/5">
                        <span className="text-5xl mt-64">
                            Share more. Stress Less.
                        </span>
                        <span>
                            Words Here Lorem Ipsum
                        </span>
                        <button className="w-20 rounded-md border-black border-2">Sign Up</button>
                </div>

                <img src="/other.png" alt="Sage" className="w-2/5"/>
            </div>
        </div>

    )
}
