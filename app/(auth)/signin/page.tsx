import { auth, signIn, signOut } from "@/lib/auth";

export default async function SignInPage() {
  const session = await auth();

  return (
    <section className="container py-16">
      <div className="max-w-md mx-auto">
        <div className="card p-8 text-center">
          <h1 className="font-display text-3xl mb-4">
            {session ? "Welcome back!" : "Sign in"}
          </h1>

          {session ? (
            <div>
              <p className="text-muted mb-4">
                You are signed in as <strong>{session.user?.email}</strong>
              </p>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="btn btn-secondary">
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p className="text-muted mb-6">
                Sign in to upload models, manage your purchases, and more.
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className="btn w-full">
                  Sign in with GitHub
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
