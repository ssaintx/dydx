import dynamic from "next/dynamic";

export const About = () => {
    const TextParticles = dynamic(() => import("../ui/magic/TextParticles"), { ssr: false });

    return (
        <section className="flex flex-col bg-neutral-900">
            <TextParticles
                texts={['About', 'Us']}
                backgroundColor="#171717"
                particleConfig={{
                    fontSize: 64,
                    count: 5000,
                    textChangeInterval: 5000
                }}
                className="w-full"
            />
            {/* MAIN CONTAINER */}
            <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="mt-4 max-w-screen-sm mx-4 text-neutral-300 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu luctus tortor, ac euismod leo. Curabitur rutrum lectus turpis, quis commodo turpis suscipit sit amet. Ut at tortor mi. In porttitor eget augue vitae vehicula. Cras a massa augue. In ac vestibulum sem. Etiam tincidunt varius nisi. Cras fermentum massa non ligula posuere, at imperdiet purus pulvinar. Vestibulum ullamcorper lacus mollis pellentesque dapibus. Ut nec eros id sem molestie molestie. Proin quis turpis elit. Donec vulputate dictum nisi non luctus. Aenean vitae nibh est. Ut ultricies ultricies massa, eget imperdiet leo facilisis id. Nunc pretium sollicitudin neque, sit amet viverra libero gravida ac.
                    Nulla feugiat dui non lacus ultrices, et tincidunt magna dignissim. Etiam imperdiet, orci a pretium tempus, metus erat viverra arcu, vel auctor sem magna vitae nibh. Praesent sit amet velit nunc. Sed non mi porta eros ullamcorper sodales. Suspendisse eleifend pretium ipsum, vitae mattis orci aliquet non. Pellentesque sit amet facilisis lacus. Vivamus vitae posuere sem.
                    Quisque ut aliquam arcu. Sed mauris nisl, suscipit nec sagittis efficitur, venenatis eget tellus. In hendrerit libero sollicitudin, sodales libero et, gravida tellus. Phasellus ultrices lorem eu mauris bibendum, sit amet rhoncus odio consequat. Nulla ultricies cursus erat, a pulvinar quam eleifend a. Maecenas lobortis ullamcorper turpis quis posuere. Proin aliquam venenatis aliquet. Cras in enim eget lectus pulvinar dictum. Mauris ante enim, maximus sed tellus rhoncus, tincidunt venenatis arcu. Mauris eget condimentum lorem. Suspendisse nec quam volutpat, vulputate ipsum vitae, convallis ex. Nam tincidunt venenatis odio at rhoncus. Donec porta justo augue, ut euismod mi porta sed. Nulla lorem velit, ultrices sed purus vitae, bibendum elementum urna. Donec sodales varius risus.
                    Mauris arcu leo, suscipit sed lobortis ac, aliquet eget augue. Ut eget nulla tellus. Curabitur dictum vestibulum finibus. Integer quis odio bibendum, aliquet erat consequat, tincidunt arcu. Donec mollis velit sagittis risus hendrerit sodales. In feugiat nunc tortor, eget imperdiet leo dignissim ut. Pellentesque sed condimentum augue. Nulla sit amet rhoncus sapien.
                    Quisque ac aliquet ante. Donec sed tortor lobortis orci euismod dignissim sit amet eget erat. Curabitur fermentum, tellus ac maximus mattis, tortor justo ultrices ligula, sed bibendum neque odio ultricies odio. Mauris tincidunt gravida erat consectetur maximus. Suspendisse a lorem quis mauris volutpat eleifend. Nullam vitae dolor in orci dapibus elementum quis nec nibh. Pellentesque congue posuere sapien non vulputate. Mauris risus ante, dictum ut lacus vel, vestibulum porttitor neque.
                </p>
            </div>
        </section>
    );
};