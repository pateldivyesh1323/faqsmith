from google import genai
from dotenv import load_dotenv
from sklearn.cluster import KMeans
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def combine_content(df):
    df["combined_content"] = df["Subject"].fillna("").astype(str) + " " + df["Body"].fillna("").astype(str)
    return df

def embed_content(contents):
    content_chunks = [contents[i:i+100] for i in range(0, len(contents), 100)]
    embeddings = []

    for chunk in content_chunks:
        result = client.models.embed_content(
            model="gemini-embedding-001",
            contents=chunk
        )
        embeddings.extend(result.embeddings)
    
    return embeddings

def kmeans_clustering(embeddings):
    num_clusters = min(5, len(embeddings))

    km = KMeans(n_clusters=num_clusters, random_state=42)
    labels = km.fit_predict(embeddings)
    return labels

def summarize_cluster(contents):
    combined = " ".join(contents[:10])
    prompt = f"""You are given multiple customer support messages that belong to the same cluster (all about the same issue).

Task:
1. Generate ONE clear and concise FAQ-style question that best represents the core problem these users are facing.
2. If the question is about a specific product, keep the product name as mentioned by users.
3. Keep the question under 20 words and make it self-contained.
4. Output only plain text without any Markdown or formatting like **, *, or ``` blocks.

Messages:
{combined}

Output only the question without explanations."""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text