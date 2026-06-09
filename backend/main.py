from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json
import os
import math

app = FastAPI(title="Social Virality Cascade Explorer - GDELT ETL Backend")

# Configure CORS cross-origin middleware to allow smooth frontend port communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def gdelt_ingestion_adapter(file_path: str) -> pd.DataFrame:
    """
    🔄 Reusable Data Ingestion Adapter:
    Extracts raw historical JSON footprints, loads them directly into a Pandas DataFrame,
    and maps them to look like authentic GDELT Global Knowledge Graph (GKG) tracking schemas.
    """
    if not os.path.exists(file_path):
        return pd.DataFrame()
    
    with open(file_path, "r") as f:
        raw_data = json.load(f)
    
    df = pd.DataFrame(raw_data)
    
    # FastAPI ETL Step: Standardize fields and inject global GDELT structural tracking markers
    if not df.empty:
        df["gdelt_event_id"] = "GDELT-SYS-" + df["id"].astype(str)
        df["ingestion_label"] = "SYNTHETIC_GDELT_STREAM_V1"
        
    return df

@app.get("/api/cascade")
def get_cascade_data(
    current_time: int = Query(0, alias="time", description="Current tracking timeline offset"),
    scenario: str = Query("A", description="Dynamic incident matrix selector context")
):
    """
    FastAPI ETL Processing Pipeline:
    1. Extracts target mock data profiles dynamically based on dropdown context selection.
    2. Transforms the matrices via Pandas to map chronological spread timeline offsets.
    3. Calculates active exponential decay curves for reach metrics before loading to client.
    """
    # Resolve file path targets dynamically without hardcoding data vectors in code
    file_name = "incident_a_mock.json" if scenario == "A" else "incident_b_mock.json"
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(base_dir, "data", file_name)
    
    # Fallback safety handler to keep runtime active if file layout drops
    if not os.path.exists(data_path):
        data_path = os.path.join(base_dir, "data", "incident_a_mock.json")

    # Execute Data Adapter Ingestion
    df = gdelt_ingestion_adapter(data_path)
    if df.empty:
        return []

    # ⏱️ Spread Timeline Filter: Slice active tracking footprints dynamically using Pandas
    filtered_df = df[df["timestamp"] <= current_time].copy()

    # 📉 Mathematical Decay Curve calculation
    # Formula: CurrentReach = InitialReach * e^(-decay_rate * delta_t)
    decayed_records = []
    for _, row in filtered_df.iterrows():
        # Delta time indicates how long the specific node has been propagating
        delta_t = max(0, current_time - row["timestamp"])
        decay_factor = math.exp(-row["decay_rate"] * delta_t)
        
        # Build out data transmission payload
        record = row.to_dict()
        record["reach"] = max(10, int(row["reach"] * decay_factor))  # Lower bounds floor at 10 views
        record["synthetic_label"] = row["ingestion_label"]           # Append explicit synthetic marker label
        decayed_records.append(record)

    return decayed_records