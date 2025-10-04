import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const complexityData = [
  { name: "Bubble Sort", best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  { name: "Merge Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  { name: "Quick Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
  { name: "Heap Sort", best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
  { name: "Linear Search", best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
  { name: "Binary Search", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
];

const chartData = [
  { n: 10, "O(1)": 1, "O(log n)": 3.3, "O(n)": 10, "O(n log n)": 33, "O(n²)": 100 },
  { n: 50, "O(1)": 1, "O(log n)": 5.6, "O(n)": 50, "O(n log n)": 282, "O(n²)": 2500 },
  { n: 100, "O(1)": 1, "O(log n)": 6.6, "O(n)": 100, "O(n log n)": 664, "O(n²)": 10000 },
  { n: 500, "O(1)": 1, "O(log n)": 8.9, "O(n)": 500, "O(n log n)": 4483, "O(n²)": 250000 },
  { n: 1000, "O(1)": 1, "O(log n)": 9.9, "O(n)": 1000, "O(n log n)": 9965, "O(n²)": 1000000 },
];

const Complexity = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complexity Analysis</h1>
        <p className="text-muted-foreground">Understanding time and space complexity of algorithms</p>
      </div>

      {/* Big-O Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Time Complexity Comparison</CardTitle>
          <CardDescription>Best, average, and worst-case scenarios for each algorithm</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Algorithm</TableHead>
                <TableHead>Best Case</TableHead>
                <TableHead>Average Case</TableHead>
                <TableHead>Worst Case</TableHead>
                <TableHead>Space</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complexityData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-success">{row.best}</TableCell>
                  <TableCell className="text-warning">{row.average}</TableCell>
                  <TableCell className="text-destructive">{row.worst}</TableCell>
                  <TableCell className="text-accent">{row.space}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Runtime Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Runtime Growth Comparison</CardTitle>
          <CardDescription>How different complexity classes scale with input size</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="n" stroke="hsl(var(--foreground))" label={{ value: "Input Size (n)", position: "insideBottom", offset: -5 }} />
              <YAxis stroke="hsl(var(--foreground))" label={{ value: "Operations", angle: -90, position: "insideLeft" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="O(1)" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              <Line type="monotone" dataKey="O(log n)" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              <Line type="monotone" dataKey="O(n)" stroke="hsl(var(--chart-4))" strokeWidth={2} />
              <Line type="monotone" dataKey="O(n log n)" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line type="monotone" dataKey="O(n²)" stroke="hsl(var(--chart-5))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Complexity Classes */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Common Complexity Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { notation: "O(1)", name: "Constant", desc: "Execution time doesn't depend on input size" },
              { notation: "O(log n)", name: "Logarithmic", desc: "Divides problem in half each step" },
              { notation: "O(n)", name: "Linear", desc: "Directly proportional to input size" },
              { notation: "O(n log n)", name: "Linearithmic", desc: "Efficient divide-and-conquer algorithms" },
              { notation: "O(n²)", name: "Quadratic", desc: "Nested iterations over input" },
            ].map((item) => (
              <div key={item.notation} className="p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-primary font-bold">{item.notation}</code>
                  <span className="text-sm font-semibold">- {item.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">
              <p className="text-sm">
                <strong>Lower complexity is better.</strong> O(log n) scales much better than O(n²) for large inputs.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border-l-4 border-accent">
              <p className="text-sm">
                <strong>Space-time tradeoff.</strong> Merge Sort uses O(n) extra space but guarantees O(n log n) time.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border-l-4 border-warning">
              <p className="text-sm">
                <strong>Worst-case matters.</strong> Quick Sort is fast on average but can degrade to O(n²).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 border-l-4 border-success">
              <p className="text-sm">
                <strong>Context is key.</strong> For small datasets, simple O(n²) algorithms can outperform complex ones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Complexity;
