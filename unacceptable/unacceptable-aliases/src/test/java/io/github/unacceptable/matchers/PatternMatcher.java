package io.github.unacceptable.matchers;

import org.hamcrest.Factory;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;

import java.util.regex.Pattern;

/**
 * Tests if the argument is a {@link CharSequence} that matchers a regular expression.
 */
public class PatternMatcher extends TypeSafeMatcher<CharSequence> {

    /**
     * Creates a matcher that matchers if the examined {@link CharSequence} matchers the specified
     * regular expression.
     * <p/>
     * For example:
     * <pre>assertThat("myStringOfNote", pattern("[0-9]+"))</pre>
     *
     * @param regex the regular expression that the returned matcher will use to match any examined {@link CharSequence}
     */
    @Factory
    public static Matcher<CharSequence> pattern(String regex) {
        return pattern(Pattern.compile(regex));
    }

    /**
     * Creates a matcher that matchers if the examined {@link CharSequence} matchers the specified
     * {@link Pattern}.
     * <p/>
     * For example:
     * <pre>assertThat("myStringOfNote", Pattern.compile("[0-9]+"))</pre>
     *
     * @param pattern the pattern that the returned matcher will use to match any examined {@link CharSequence}
     */
    @Factory
    public static Matcher<CharSequence> pattern(Pattern pattern) {
        return new PatternMatcher(pattern);
    }

    private final Pattern pattern;

    public PatternMatcher(Pattern pattern) {
        this.pattern = pattern;
    }

    @Override
    public boolean matchesSafely(CharSequence item) {
        return pattern.matcher(item).matches();
    }

    @Override
    public void describeMismatchSafely(CharSequence item, org.hamcrest.Description mismatchDescription) {
        mismatchDescription.appendText("was \"").appendText(String.valueOf(item)).appendText("\"");
    }

    @Override
    public void describeTo(org.hamcrest.Description description) {
        description.appendText("a string with pattern \"").appendText(String.valueOf(pattern)).appendText("\"");
    }
}

