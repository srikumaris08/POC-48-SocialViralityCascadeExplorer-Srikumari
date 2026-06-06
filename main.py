from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Scenario A: Security Breach Data Vector
scenario_a = [
    {"id": "1", "user": "@Tech_Whistleblower", "platform": "X", "type": "origin", "content": "Security breach vector active on main rail.", "reach": 12000, "timestamp": 0, "parentId": None},
    {"id": "2", "user": "@Dev_Alpha", "platform": "X", "type": "routing", "content": "Secondary packet replication verified.", "reach": 4500, "timestamp": 5, "parentId": "1"},
    {"id": "3", "user": "@Venture_Capital_Daily", "platform": "LinkedIn", "type": "influencer", "content": "Major movement on cross-platform tech allocations.", "reach": 85000, "timestamp": 15, "parentId": "2"},
    {"id": "4", "user": "#SaaS_Founder_X", "platform": "LinkedIn", "type": "routing", "content": "Reviewing security analytics cascade maps.", "reach": 22000, "timestamp": 22, "parentId": "3"},
    {"id": "5", "user": "@ByteSizePolitics", "platform": "TikTok", "type": "influencer", "content": "This data leak is blowing up right now!", "reach": 250000, "timestamp": 30, "parentId": "3"},
    {"id": "6", "user": "u/NetSecurity_Mod", "platform": "Reddit", "type": "routing", "content": "Tracking secondary replication logs.", "reach": 14200, "timestamp": 45, "parentId": "5"},
    {"id": "7", "user": "@Privacy_Watchdog", "platform": "X", "type": "routing", "content": "Decay half-life limit achieved on main cascade.", "reach": 19900, "timestamp": 60, "parentId": "4"}
]

#  Scenario B: Stealth Product Blueprint Leak
scenario_b = [
    {"id": "1", "user": "@Leak_Commander", "platform": "Reddit", "type": "origin", "content": "Leaked CAD schematics of the upcoming Gen-Z Smart Ring!", "reach": 45000, "timestamp": 0, "parentId": None},
    {"id": "2", "user": "u/Gadget_Reviewer", "platform": "Reddit", "type": "routing", "content": "Can anyone verify these internal component sizing rails?", "reach": 18000, "timestamp": 10, "parentId": "1"},
    {"id": "3", "user": "@Tech_Unboxed", "platform": "TikTok", "type": "influencer", "content": "The new Smart Ring details just leaked online, look at this design!!", "reach": 680000, "timestamp": 20, "parentId": "2"},
    {"id": "4", "user": "@Silicon_Valley_Hub", "platform": "X", "type": "influencer", "content": "Hardware competitor shares tanking after unexpected ring leaks.", "reach": 190000, "timestamp": 35, "parentId": "3"},
    {"id": "5", "user": "@Eng_Director_X", "platform": "LinkedIn", "type": "routing", "content": "Fascinating ergonomics layout choices in this prototype leak frame.", "reach": 8200, "timestamp": 50, "parentId": "4"},
    {"id": "6", "user": "@Patent_Watch", "platform": "X", "type": "routing", "content": "Cross-checking leak footprints with recent global utility filings.", "reach": 31000, "timestamp": 60, "parentId": "4"}
]

@app.get("/api/cascade")
def get_cascade_data(
    current_time: int = Query(0, alias="time"), 
    scenario: str = Query("A")
):
    """
    Swaps the data environment dynamically, then uses Pandas to filter network tracking arrays
    """
    # Swap array based on selection query
    selected_dataset = scenario_b if scenario == "B" else scenario_a
    
    # Process instantly inside Pandas
    df = pd.DataFrame(selected_dataset)
    filtered_df = df[df["timestamp"] <= current_time]
    
    return filtered_df.to_dict(orient="records")