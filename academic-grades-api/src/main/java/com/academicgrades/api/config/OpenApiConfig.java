package com.academicgrades.api.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Academic Grades API",
                version = "1.0.0",
                description = "REST API for managing students, subjects and grades.",
                contact = @Contact(
                        name = "Paola cuellar Beltran",
                        email = "paola2010andrea05@gmail.com"
                )
        ),
        servers = {
                @Server(
                        url = "http://localhost:8080",
                        description = "Local development server"
                )
        }
)
public class OpenApiConfig {
}