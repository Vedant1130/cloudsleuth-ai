from pydantic import BaseModel
from typing import List


class InvestigationSummary(BaseModel):
    totalResources: int
    totalFindings: int
    high: int
    medium: int
    low: int


class InvestigationFinding(BaseModel):
    category: str
    severity: str
    title: str
    description: str
    recommendation: str
    resourceId: str
    resourceName: str
    provider: str


class AnalysisRequest(BaseModel):
    summary: InvestigationSummary
    findings: List[InvestigationFinding]


class AIAnalysisResponse(BaseModel):
    overview: str
    key_insights: List[str]
    prioritized_actions: List[str]
    risk_assessment: str