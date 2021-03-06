package io.github.unacceptable.rules;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * The annotated test is incomplete, and is expected to fail, but should be run. Unlike JUnit's {@link org.junit.Ignore}
 * annotation, this will cause the test to be run, and will ignore the test if it fails. If the test passes, the success
 * will be converted into a failure to bring the change to the attention of the developer. This policy is controlled by
 * the {@link IncompleteTestSupport} rule, which must be applied to the tests.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface Incomplete {
    /**
     * A free-text rationale describing why the test is considered incomplete. This will not be included in error
     * messages related to the test, but will be available for inspection by reflection and code quality tools. Sensible
     * values include a short description, or a bug tracker issue number, or a milestone name.
     *
     * @return the rationale for the test's incomplete status.
     */
    String value();
}
