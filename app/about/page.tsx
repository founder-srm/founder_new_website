'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const About: React.FC = () => {

    const aboutMembers = [
        {
            id : 1,
            name : "Ishan Roy",
            designation : "Club Lead",
            image : "/about/l-ishan-all.png",
            profile : "https://www.linkedin.com/in/ishan-roy-742933272/",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">About Us</p>
            <p className="text-white text-xl max-sm:text-sm">We are the one and only entrepreneurship focused club of SRM KTR</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={aboutMembers} />
            </a>
        </div>
    );

};

const Creatives: React.FC = () => {

    const creativeMembers = [
        {
            id : 1,
            name : "Arhaan",
            designation : "Associate Lead",
            image : "/about/al-arhaan-c.jpg",
            profile : "https://www.linkedin.com/in/arhaansiddiquee/",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">Creatives</p>
            <p className="text-white text-xl max-sm:text-sm">Crafting eye-catching content to showcase our club's vision and events. Unleash your creativity and make our ideas come to life, attracting the community and establishing a potential connect with them!</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={creativeMembers} />
            </a>
        </div>
    );

};

const OperationsAndMarketing: React.FC = () => {

    const opmMembers = [
        {
            id : 1,
            name : "Aryan",
            designation : "Associate Lead",
            image : "/about/al-aryan-opm.jpg",
            profile : "https://www.linkedin.com/in/aryansingh0208",
        },
        {
            id : 2,
            name : "Karthikeyan",
            designation : "Associate Lead",
            image : "/about/al-karthikeyan-opm.png",
            profile : "https://www.linkedin.com/in/karthikeyan-s-93932a251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        {
            id : 3,
            name : "Chandrakant",
            designation : "Associate Lead",
            image : "/about/al-chandrakant-opm.jpg",
            profile : "https://www.linkedin.com/in/chandrakant-subheswar-subudhi-119738285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">Operations and Marketing</p>
            <p className="text-white text-xl max-sm:text-sm">Strategizing and executing events, while broadcasting the activities to ensure maximum impact. Be the driving force behind our club's affairs and engagements</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={opmMembers} />
            </a>
        </div>
    );

};

const Outreach: React.FC = () => {

    const outreachMembers = [
        {
            id : 1,
            name : "Arhaan",
            designation : "Associate Lead",
            image : "/about/l-suvan-t.jpg",
            profile : "https://www.linkedin.com/in/arhaansiddiquee/",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">Outreach</p>
            <p className="text-white text-xl max-sm:text-sm">Building bridges with startups, E-Cells, and the broader community to expand our network and influence. Connect and collaborate to create valuable partnerships</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={outreachMembers} />
            </a>
        </div>
    );

};

const Sponsorships: React.FC = () => {

    const sponserMembers = [
        {
            id : 1,
            name : "Arhaan",
            designation : "Associate Lead",
            image : "/about/l-suvan-t.jpg",
            profile : "https://www.linkedin.com/in/arhaansiddiquee/",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">Sponsorships</p>
            <p className="text-white text-xl max-sm:text-sm">Securing the resources we need to power our initiatives by building strong relationships with sponsors. Be the backbone of our club's financial support</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={sponserMembers} />
            </a>
        </div>
    );

};

const Technical: React.FC = () => {

    const techMembers = [
        {
            id : 1,
            name : "Vijay Makkad",
            designation : "Associate Lead",
            image : "/about/al-vijay-t.jpeg",
            profile : "https://www.linkedin.com/in/vijay-makkad-1573681b3/",
        },
        {
            id : 2,
            name : "Suvan GS",
            designation : "Lead",
            image : "/about/l-suvan-t.jpg",
            profile : "https://www.linkedin.com/in/suvan-gowri-shanker-596943261/",
        },
        {
            id : 3,
            name : "Banger Bhai",
            designation : "Associate Lead",
            image : "/about/al-saransh-t.jpg",
            profile : "https://www.linkedin.com/in/saransh-bangar",
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-white text-8xl max-md:text-6xl max-sm:text-4xl font-semibold font-sans">Technical</p>
            <p className="text-white text-xl max-sm:text-sm">Developing innovative technical solutions to create and maintain in-house projects within DEI. Use your skills to turn ideas into functional realities!</p>
            <a href="" className="flex flex-row justify-start gap-16">
                <AnimatedTooltip items={techMembers} />
            </a>
        </div>
    );

};

export default function Page() {

    let tabs = [
        { id: "1", label: "Creatives" },
        { id: "2", label: "Operations and Marketing" },
        { id: "3", label: "Outreach" },
        { id: "4", label: "Sponsorships" },
        { id: "5", label: "Technical" },
    ];

    let [activeTab, setActiveTab] = useState(tabs[0].id);
    const [selectedComponent, setSelectedComponent] = useState<React.FC>(() => About);

    return (
        <div>

            <main className="max-sm:hidden w-screen h-fit min-h-screen flex flex-col bg-[#090909]">
                <Navbar />
                <section className="w-full h-fit flex justify-center mt-[calc(80px+3rem)]">
                    <div className="flex flex-col justify-start w-[80%]">
                        <div className="flex justify-center space-x-3">
                            {tabs.map((tab) => (
                                <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSelectedComponent(() => {
                                        switch (tab.id) {
                                            case "1":
                                                return Creatives;
                                            case "2":
                                                return OperationsAndMarketing;
                                            case "3":
                                                return Outreach;
                                            case "4":
                                                return Sponsorships;
                                            case "5":
                                                return Technical;
                                            default:
                                                return About;
                                        }
                                    });
                                }}
                                className={`${
                                    activeTab === tab.id ? "" : "hover:text-white/60"
                                } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
                                style={{
                                    WebkitTapHighlightColor: "transparent",
                                }}
                                >
                                {activeTab === tab.id && (
                                    <motion.span
                                    layoutId="bubble"
                                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                                    style={{ borderRadius: 9999 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {tab.label}
                                </button>
                            ))}
                        </div>
                        <div className="w-full mt-16 mb-8">
                            {React.createElement(selectedComponent)}
                        </div>
                    </div>
                </section>
                <Footer />
            </main>

            <main className="hidden max-sm:block bg-[#090909]">
                <Navbar />
                <section className="flex flex-col px-[12.5%] gap-2 mt-[calc(80px+30px)] mb-[30px]">
                    <About />
                    <div className="flex justify-center my-2">
                        <hr className="w-[75%] border-dotted" />
                    </div>
                    <Creatives />
                    <div className="flex justify-center my-2">
                        <hr className="w-[75%] border-dotted" />
                    </div>
                    <OperationsAndMarketing />
                    <div className="flex justify-center my-2">
                        <hr className="w-[75%] border-dotted" />
                    </div>
                    <Outreach />
                    <div className="flex justify-center my-2">
                        <hr className="w-[75%] border-dotted" />
                    </div>
                    <Sponsorships />
                    <div className="flex justify-center my-2">
                        <hr className="w-[75%] border-dotted" />
                    </div>
                    <Technical />
                </section>
                <Footer />
            </main>
        </div>
    );
}
