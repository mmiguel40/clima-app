import './EnvironmentBanner.css';

const EnvironmentBanner = () => {
    const envLabel = import.meta.env.VITE_ENV_LABEL;

    if (!envLabel) return null;

    // Determine color based on environment
    const getBackgroundColor = () => {
        const lower = envLabel.toLowerCase();
        if (lower.includes('dev')) return '#e74c3c'; // Red for Dev
        if (lower.includes('qa')) return '#f39c12';  // Orange for QA
        return '#3498db'; // Blue for others
    };

    return (
        <div className="environment-banner" style={{ backgroundColor: getBackgroundColor() }}>
            {envLabel}
        </div>
    );
};

export default EnvironmentBanner;
