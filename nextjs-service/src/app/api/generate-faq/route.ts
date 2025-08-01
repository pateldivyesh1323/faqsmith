import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const start = performance.now();
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 400 }
            );
        }

        const response = await axios.post(
            `${process.env.AI_DOMAIN}/generate_faq`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const end = performance.now();
        console.log(`Time taken: ${end - start} milliseconds`);

        return NextResponse.json({ questions: response.data.summaries });
    } catch (error) {
        console.error("Error generating FAQ:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
