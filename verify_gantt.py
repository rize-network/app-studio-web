from playwright.sync_api import sync_playwright, expect
import sys

def test_gantt_chart_rendering(page):
    print("Navigating to http://localhost:3000/")
    page.goto("http://localhost:3000/")

    print("Waiting for sidebar...")
    page.wait_for_selector("text=Navigation", timeout=30000)

    print("Clicking Gantt in sidebar...")
    page.get_by_text("Gantt", exact=True).click()

    print("Waiting for Gantt Chart Example text...")
    expect(page.get_by_text("Gantt Chart Example")).to_be_visible(timeout=30000)

    print("Gantt Chart Example text found!")

    print("Checking for Milestones...")
    expect(page.get_by_text("Q1 Release")).to_be_visible()

    print("Checking for Tasks...")
    expect(page.get_by_text("Design System Implementation")).to_be_visible()

    print("Gantt chart verified successfully!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Capture logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Page Error: {exc}"))

        try:
            test_gantt_chart_rendering(page)
        except Exception as e:
            print(f"Error finding Gantt Chart Example: {e}")
            page.screenshot(path="/home/jules/verification/debug_fail.png")
            print(f"Page content snippet:\n{page.content()[:2000]}")
            sys.exit(1)
        finally:
            browser.close()
