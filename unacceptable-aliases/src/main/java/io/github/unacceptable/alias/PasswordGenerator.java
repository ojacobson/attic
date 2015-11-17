package io.github.unacceptable.alias;

import java.util.Random;
import java.util.stream.Collectors;

public class PasswordGenerator implements Generator<String> {
    private static final Random RANDOM = new Random();
    private static final int DEFAULT_LENGTH = 16;
    private static final String DEFAULT_PASSWORD_CHARS =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    + "0123456789"
                    + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
                    + " ";
    private static final PasswordGenerator GENERATOR = new PasswordGenerator();
    private final Generator<String> generator;

    /**
     * Generate a password using suitable defaults.
     *
     * @param alias
     *         an alias for the generated password.
     * @return a password, generated using suitable defaults.
     * @see #generate(String)
     */
    public static String defaultGenerate(String alias) {
        return GENERATOR.generate(alias);
    }

    private final int length;
    private final String passwordChars;

    public PasswordGenerator() {
        this(DEFAULT_LENGTH, DEFAULT_PASSWORD_CHARS);
    }

    public PasswordGenerator(int length) {
        this(length, DEFAULT_PASSWORD_CHARS);
    }

    public PasswordGenerator(String passwordChars) {
        this(DEFAULT_LENGTH, passwordChars);
    }

    public PasswordGenerator(int length, String passwordChars) {
        this.length = length;
        this.passwordChars = passwordChars;
        generator = new EmptyWrappingGenerator(new AbsentWrappingGenerator(new LiteralWrappingGenerator(this::generatePassword)));
    }

    @Override
    public String generate(final String alias) {
        return generator.generate(alias);
    }

    /**
     * Generates random passwords. The template is ignored, but can be used by {@link AliasStore} to reuse a password
     * once generated. A random string, generated by selecting a fixed number of characters from a set of password
     * characters. By default, {@value #DEFAULT_LENGTH} characters chosen with replacement from the set {@value
     * #DEFAULT_PASSWORD_CHARS} will be returned.
     *
     * @param alias
     *         a password alias, such as <code>"derek"</code>.
     * @return a randomly-generated password, such as <code>"u;V4[:~7!_U-j.1="</code>.
     */
    public String generatePassword(String alias) {
        return RANDOM.ints(length, 0, passwordChars.length())
                .map(passwordChars::charAt)
                .mapToObj(c -> Character.toString((char) c))
                .collect(Collectors.joining());
    }
}
