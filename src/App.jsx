const App = () => {
    const width = 400;
    const height = 400;

    const rect = [
        { label: "A", x: 100, y: 100, width: 250, height: 30, fill: "orange" },
        { label: "B", x: 100, y: 200, width: 200, height: 30, fill: "purple" },
        { label: "C", x: 100, y: 300, width: 100, height: 30, fill: "pink" },

    ];
    
    return (
        <svg width={width} height={height}>
            <g>
                <line x1="100" y1="0" x2="100" y2="400" stroke="black" />
                {rect.map(({ label, x, y, width, height, fill }, i) => {
                    console.log(label)
                    return (
                <g key={i}>

                    <rect

                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={fill}
                    />
                    

                    <text

                        x={x - 20}
                        y={y + 15}
                        textAnchor="middle"
                        dominantBaseline="central">
                        {label}
                    </text>
                    <line x1={x-10} y1={y+15} x2={x} y2={y+15} stroke="black"/>
                </g>
                    )

                })}

            </g>
        </svg>
    );
};

export default App;