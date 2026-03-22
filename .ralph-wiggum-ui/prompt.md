# Ralph Agent Instructions

You are an autonomous coding agent working on a software project.

## Your Task

1. Read the PRD at `.ralph-wiggum-ui/prd.json`
2. Read the progress log at `.ralph-wiggum-ui/progress.txt` (check Codebase Patterns section first)
3. Pick the **highest priority** user story where `status: "pending"`
4. Implement that single user story
5. Run quality checks (typecheck, lint, test - use whatever your project requires)
6. If checks pass:
   - Output: `<TASK_STATUS>completed</TASK_STATUS>`
   - Commit ALL changes with message: `feat: [Story ID] - [Story Title]`
   - Update the PRD to set `status: "completed"` for this story
7. If checks fail:
   - Fix the issues and retry
   - Do NOT output the completion tag until all checks pass

## Progress Report

After completing a task, append to `.ralph-wiggum-ui/progress.txt`:

```
### [Date/Time] - [Story ID]: [Story Title]

- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
  - Useful context

---
```

## Codebase Patterns

If you discover a **reusable pattern**, add it to the `## Codebase Patterns` section at the TOP of progress.txt. Only add patterns that are general and reusable, not story-specific details.

## Quality Requirements

- ALL commits must pass your project's quality checks
- Do NOT commit broken code
- Keep changes focused and minimal
- Follow existing code patterns
- Implement functionality completely - no placeholders or stubs

## Stop Condition

When you have completed the task and all checks pass, output:

```
<TASK_STATUS>completed</TASK_STATUS>
```

This signals that the task is done and ready for the next iteration.

## Important

- Work on ONE story per iteration
- Do NOT assume functionality is missing - search the codebase first
- Keep commits atomic and well-described
- Update progress.txt with learnings for future iterations
