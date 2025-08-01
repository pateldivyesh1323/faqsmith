from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
import io
from processing import combine_content, embed_content, kmeans_clustering, summarize_cluster
import numpy as np

app = FastAPI()

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/generate_faq")
async def file_upload(file: UploadFile = File(...)):
    if file.content_type != "text/csv" and file.content_type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        raise HTTPException(status_code=400, detail="File must be a CSV or XLSX file")
    
    contents = await file.read()
    if file.content_type == "text/csv":
        df = pd.read_csv(io.BytesIO(contents))
    else:
        df = pd.read_excel(io.BytesIO(contents))

    if "Subject" not in df.columns or "Body" not in df.columns:
        raise HTTPException(status_code=400, detail="CSV file must contain Subject and Body columns")
    
    df = combine_content(df)
    embeddings = embed_content(df["combined_content"].tolist())
    embeddings = np.array([e.values for e in embeddings])

    labels = kmeans_clustering(embeddings)
    print(labels)
    df["cluster"] = labels
    df.to_csv("clustered_tickets.csv", index=False)

    grouped = df.groupby("cluster")["combined_content"].apply(list).to_dict()

    summaries = []
    for _, contents in grouped.items():
        summary = summarize_cluster(contents)
        print(summary)
        summaries.append(summary)
    return {
        "summaries": summaries
    }

