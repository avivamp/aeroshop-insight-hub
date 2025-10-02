-- Create search_logs table for AI search analytics
CREATE TABLE public.search_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT now(),
    merchant_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(100) NOT NULL,
    user_id VARCHAR(100),
    query TEXT NOT NULL,
    query_embedding JSONB,
    latency_ms INT,
    results_count INT,
    top_result_id VARCHAR(50),
    top_result_score FLOAT,
    selected_product_id VARCHAR(50),
    conversion BOOLEAN DEFAULT false,
    error_flag BOOLEAN DEFAULT false,
    client_type VARCHAR(50),
    country VARCHAR(50)
);

-- Enable Row Level Security
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- Create index for better query performance
CREATE INDEX idx_search_logs_merchant_id ON public.search_logs(merchant_id);
CREATE INDEX idx_search_logs_timestamp ON public.search_logs(timestamp);
CREATE INDEX idx_search_logs_session_id ON public.search_logs(session_id);

-- RLS Policies - Allow authenticated users to view all search logs
-- Note: Adjust these policies based on your access control requirements
CREATE POLICY "Allow authenticated users to view search logs"
ON public.search_logs
FOR SELECT
TO authenticated
USING (true);

-- Allow service role to insert search logs
CREATE POLICY "Allow service role to insert search logs"
ON public.search_logs
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow authenticated users to insert search logs
CREATE POLICY "Allow authenticated users to insert search logs"
ON public.search_logs
FOR INSERT
TO authenticated
WITH CHECK (true);