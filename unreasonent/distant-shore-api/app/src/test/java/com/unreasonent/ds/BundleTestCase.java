package com.unreasonent.ds;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jersey.setup.JerseyEnvironment;
import io.dropwizard.jetty.setup.ServletEnvironment;
import io.dropwizard.lifecycle.setup.LifecycleEnvironment;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.junit.Before;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BundleTestCase {
    @SuppressWarnings("unchecked")
    protected final Bootstrap<DistantShoreConfiguration> bootstrap = mock(Bootstrap.class);
    protected final Environment environment = mock(Environment.class);
    protected final ServletEnvironment servlets = mock(ServletEnvironment.class);
    protected final JerseyEnvironment jersey = mock(JerseyEnvironment.class);
    protected final LifecycleEnvironment lifecycle = mock(LifecycleEnvironment.class);
    protected final ObjectMapper objectMapper = mock(ObjectMapper.class);

    protected final DistantShoreConfiguration configuration = new DistantShoreConfiguration() {
        {
            getOauth().setSecret("JWT-SECRET");
        }
    };

    @Before
    public void wireMocks() {
        when(environment.servlets()).thenReturn(servlets);
        when(environment.jersey()).thenReturn(jersey);
        when(environment.lifecycle()).thenReturn(lifecycle);
        when(environment.getObjectMapper()).thenReturn(objectMapper);
    }
}