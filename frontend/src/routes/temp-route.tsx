import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/temp-route")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { history } = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">👨‍🍳</h1>
        <span className="font-medium">This page is still cooking</span>
        <p className="text-muted-foreground text-center">
          We haven’t added the ingredients for this page yet. <br />
          Check back later when it’s ready to serve! 🍲
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
