export interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  markets: string[];
  lastUpdated: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    barThickness: number;
  }[];
}

export interface TargetUpdate {
  id: number;
  name?: string;
  description?: string;
  pipelineStatus?: "Passed" | "Cold" | "Active" | "Hot" | "Closed" | null;
  markets?: string[];
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export interface GlobalFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export interface BarChartProps {
  filter: string;
}

export interface TargetTableProps {
  filter?: string;
}
