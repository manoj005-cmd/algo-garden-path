import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quizzes = [
  {
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 2,
    explanation: "Bubble Sort has O(n²) worst-case time complexity because it uses nested loops.",
  },
  {
    question: "Which sorting algorithm guarantees O(n log n) time complexity in all cases?",
    options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    explanation: "Merge Sort always divides and merges in O(n log n) time, regardless of input.",
  },
  {
    question: "Binary Search requires the array to be:",
    options: ["Unsorted", "Sorted", "Reversed", "Random"],
    correct: 1,
    explanation: "Binary Search only works on sorted arrays as it relies on the order to eliminate half the search space.",
  },
  {
    question: "What is the space complexity of Quick Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 1,
    explanation: "Quick Sort uses O(log n) space for the recursive call stack in the average case.",
  },
  {
    question: "Which algorithm is most efficient for searching in an unsorted array?",
    options: ["Binary Search", "Linear Search", "Quick Sort", "Merge Sort"],
    correct: 1,
    explanation: "Linear Search is the only option for unsorted arrays, checking each element sequentially.",
  },
  {
    question: "Heap Sort is based on which data structure?",
    options: ["Array", "Linked List", "Binary Heap", "Hash Table"],
    correct: 2,
    explanation: "Heap Sort uses a binary heap data structure to efficiently sort elements.",
  },
  {
    question: "What is the best-case time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 1,
    explanation: "Quick Sort achieves O(n log n) in the best and average cases with good pivot selection.",
  },
  {
    question: "Which sorting algorithm is stable?",
    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
    correct: 2,
    explanation: "Merge Sort maintains the relative order of equal elements, making it stable.",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      toast({
        title: "No answer selected",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === quizzes[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: quizzes[currentQuestion].explanation,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const progress = ((answeredQuestions.length) / quizzes.length) * 100;
  const isLastQuestion = currentQuestion === quizzes.length - 1;
  const allQuestionsAnswered = answeredQuestions.length === quizzes.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Algorithm Quiz</h1>
        <p className="text-muted-foreground">Test your knowledge with instant feedback</p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1} of {quizzes.length}</span>
            <span className="font-bold">Score: {score}/{answeredQuestions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {!allQuestionsAnswered ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{quizzes[currentQuestion].question}</CardTitle>
            <CardDescription>Select the correct answer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => setSelectedAnswer(parseInt(v))}>
              <div className="space-y-3">
                {quizzes[currentQuestion].options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      showResult
                        ? idx === quizzes[currentQuestion].correct
                          ? "border-success bg-success/10"
                          : idx === selectedAnswer
                          ? "border-destructive bg-destructive/10"
                          : "border-border"
                        : selectedAnswer === idx
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value={idx.toString()} id={`option-${idx}`} disabled={showResult} />
                    <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-medium">
                      {option}
                    </Label>
                    {showResult && idx === quizzes[currentQuestion].correct && (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    )}
                    {showResult && idx === selectedAnswer && idx !== quizzes[currentQuestion].correct && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {showResult && (
              <div className="p-4 rounded-lg bg-accent/10 border-l-4 border-accent">
                <p className="text-sm font-semibold mb-1">Explanation:</p>
                <p className="text-sm">{quizzes[currentQuestion].explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              {!showResult ? (
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1" disabled={isLastQuestion}>
                  {isLastQuestion ? "Finish Quiz" : "Next Question"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Complete! 🎉</CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="text-6xl font-bold text-primary mb-4">
                {score}/{quizzes.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {score === quizzes.length
                  ? "Perfect score! You're an algorithm expert! 🌟"
                  : score >= quizzes.length * 0.7
                  ? "Great job! You know your algorithms well! 👏"
                  : score >= quizzes.length * 0.5
                  ? "Good effort! Keep practicing! 💪"
                  : "Keep learning and try again! 📚"}
              </p>
            </div>
            <Button onClick={handleReset} className="w-full gap-2">
              <RotateCcw className="h-4 w-4" />
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Quiz;
