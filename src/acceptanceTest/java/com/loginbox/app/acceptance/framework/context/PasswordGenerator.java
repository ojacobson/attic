package com.loginbox.app.acceptance.framework.context;

import java.util.Random;
import java.util.stream.Collectors;

public class PasswordGenerator {
    private static final Random RANDOM = new Random();
    private static final int LENGTH = 16;
    private static final String PASSWORD_CHARS =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    + "0123456789"
                    + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
                    + " ";

    private PasswordGenerator() {
        throw new UnsupportedOperationException();
    }

    /**
     * Generates random passwords. The template is ignored, but can be used by {@link AliasStore} to reuse a password
     * once generated. A random string, generated by selecting {@value #LENGTH} characters from a set of letters,
     * numbers, punctuation, and spaces, will be returned.
     * <p>
     * This method is suitable for use in an {@link com.loginbox.app.acceptance.framework.context.AliasStore}.
     *
     * @param alias
     *         a password alias, such as <code>"derek"</code>.
     * @return a randomly-generated password, such as <code>"u;V4[:~7!_U-j.1="</code>.
     */
    public static String generate(String alias) {
        return RANDOM.ints(LENGTH, 0, PASSWORD_CHARS.length())
                .map(PASSWORD_CHARS::charAt)
                .mapToObj(c -> Character.toString((char) c))
                .collect(Collectors.joining());
    }
}
