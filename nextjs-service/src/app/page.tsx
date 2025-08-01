"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import GithubIcon from "./icons/github";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [faqQuestions, setFaqQuestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme === "dark") {
                document.documentElement.classList.add("dark");
                setIsDark(true);
            } else {
                document.documentElement.classList.remove("dark");
                setIsDark(false);
            }
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            setIsLoading(true);
            console.log("Uploading file:", selectedFile.name);
            setTimeout(() => {
                setFaqQuestions([
                    "Q1: What is the return policy?",
                    "Q2: How do I track my order?",
                    "Q3: What payment methods are accepted?",
                    "Q4: Can I return a digital product?",
                    "Q5: How long does shipping take?",
                ]);
                setIsLoading(false);
            }, 2000);
        } else {
            alert("Please select a file first.");
        }
    };

    const toggleTheme = () => {
        if (typeof window !== "undefined") {
            const html = document.documentElement;
            if (html.classList.contains("dark")) {
                html.classList.remove("dark");
                setIsDark(false);
                localStorage.setItem("theme", "light");
            } else {
                html.classList.add("dark");
                setIsDark(true);
                localStorage.setItem("theme", "dark");
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center py-12 px-4 md:px-8 lg:px-16 bg-white text-black dark:bg-black dark:text-white">
            <header className="absolute top-0 right-0 p-6 flex gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </Button>
                <Link
                    href="https://github.com/pateldivyesh1323/faqsmith"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="ghost" size="icon">
                        <GithubIcon />
                    </Button>
                </Link>
            </header>

            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
                    FAQsmith
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Revolutionize your customer support with AI-powered FAQ
                    generation. Simply upload your data and get instant,
                    accurate answers.
                </p>
            </div>

            <div className="w-full max-w-3xl space-y-10 p-6 md:p-10 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                        Generate FAQs from Your Data
                    </h2>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                        Effortlessly transform your CSV or Excel files into a
                        comprehensive list of frequently asked questions.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid w-full items-center gap-2">
                        <label
                            htmlFor="file"
                            className="text-sm font-medium leading-none"
                        >
                            Upload your file (CSV or Excel)
                        </label>
                        <Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            accept=".csv, .xls, .xlsx"
                            className="border rounded-md focus:ring-black focus:border-black bg-gray-200 text-black border-gray-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || isLoading}
                        className="w-full py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition-colors duration-200 dark:bg-white dark:hover:bg-gray-200 dark:text-black"
                    >
                        {isLoading ? "Generating..." : "Generate FAQs"}
                    </Button>
                </div>

                {faqQuestions.length > 0 && (
                    <div className="space-y-6 pt-8 mt-8 border-t border-gray-400 dark:border-gray-600">
                        <h2 className="text-2xl font-bold text-center text-black dark:text-white">
                            Generated FAQs
                        </h2>
                        <div className="p-4 space-y-4 max-h-96 overflow-y-auto rounded-md bg-gray-200 dark:bg-gray-800">
                            {faqQuestions.map((faq, index) => (
                                <p
                                    key={index}
                                    className="text-black dark:text-white border-b border-gray-300 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                                >
                                    {faq}
                                </p>
                            ))}
                        </div>
                        <Button
                            onClick={() => setFaqQuestions([])}
                            className="w-full py-2 bg-gray-800 hover:bg-black text-white font-semibold rounded-md transition-colors duration-200 dark:bg-gray-200 dark:hover:bg-white dark:text-black"
                        >
                            Clear FAQs
                        </Button>
                    </div>
                )}
            </div>

            <section className="w-full max-w-3xl mt-24 text-center">
                <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg space-y-3 bg-gray-100 dark:bg-gray-900 shadow-md">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            Fast Processing
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Quickly analyze large datasets for efficient FAQ
                            generation.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg space-y-3 bg-gray-100 dark:bg-gray-900 shadow-md">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            Accurate Results
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Leverage advanced AI to extract precise questions
                            and answers.
                        </p>
                    </div>
                    <div className="p-6 rounded-lg space-y-3 bg-gray-100 dark:bg-gray-900 shadow-md">
                        <h3 className="text-xl font-semibold text-black dark:text-white">
                            Easy Integration
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Seamlessly integrate generated FAQs into your
                            existing platforms.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="w-full mt-24 py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
                <p>
                    &copy; {new Date().getFullYear()} FAQsmith. All rights
                    reserved.
                </p>
            </footer>
        </main>
    );
}
