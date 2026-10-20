<!--
Sync Impact Report
- Version change: unspecified scaffold → 1.0.0 (initial ratification)
- Modified principles: template placeholders → five user-provided principles
- Added sections: Contexto de producto; Flujo de desarrollo
- Removed sections: none
- Follow-up TODOs: Confirm original ratification date and replace TODO(RATIFICATION_DATE).
-->
# Constitución de tcanvapro

## Core Principles

### I. Simplicidad ante todo
Ante dos soluciones que satisfacen la especificación, se DEBE elegir la más simple. El
proyecto es una versión 1: no se DEBE añadir complejidad anticipada ni abstraer sin una
necesidad especificada. Esto mantiene el producto comprensible y fácil de cambiar.

### II. Idioma y mercado: Perú
Toda interfaz, contenido y comunicación del producto DEBE estar en español de Perú. Los
importes DEBEN expresarse en soles peruanos (PEN) y los formatos visibles DEBEN ser
adecuados al mercado peruano.

### III. Cero alcance fantasma
Solo se DEBE implementar funcionalidad descrita en la especificación vigente. Una idea
nueva se DEBE proponer para incorporarla a la especificación antes de construirla. La
especificación es el límite verificable del alcance.

### IV. Éxito verificable por una persona no técnica
Cada criterio de éxito DEBE poder comprobarse usando la aplicación, sin leer código ni
usar herramientas de desarrollo. Las especificaciones y revisiones DEBEN describir
resultados observables en la interfaz o en el comportamiento del producto.

### V. Respeto por los datos del usuario
El producto DEBE solicitar solo los datos imprescindibles para la funcionalidad
especificada. No se DEBEN incluir claves, contraseñas, tokens ni otros secretos en el
código fuente. Así se reduce la exposición de información y se evita el manejo de datos
sin propósito de producto.

## Contexto de producto

El proyecto es una herramienta web de versión 1. Las decisiones de producto y de
implementación DEBEN respetar los cinco principios anteriores y el alcance de la
especificación vigente.

## Flujo de desarrollo

Antes de implementar una funcionalidad, esta DEBE estar descrita en la especificación y
contar con criterios de éxito observables en la aplicación. La revisión de cada cambio
DEBE comprobar su conformidad con esta constitución y que cualquier criterio de éxito
pueda verificarse sin inspeccionar código.

## Governance

Esta constitución gobierna las decisiones de producto e ingeniería del proyecto. Toda
propuesta de cambio DEBE actualizar este documento y su versión: incremento MAJOR para
cambios incompatibles o eliminación de principios, MINOR para principios o secciones
nuevos o ampliaciones sustantivas, y PATCH para aclaraciones sin cambio semántico. Cada
cambio DEBE registrar su motivo y fecha de enmienda. Las revisiones de especificaciones
y cambios de producto DEBEN comprobar su cumplimiento. Si una práctica entra en conflicto
con esta constitución, se DEBE resolver el conflicto actualizando primero la práctica o,
si corresponde, enmendando formalmente esta constitución.

**Versión**: 1.0.0 | **Ratificada**: TODO(RATIFICATION_DATE): confirmar fecha original de adopción | **Última enmienda**: 2026-10-20
