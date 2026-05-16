package com.esports.infrastructure.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Responsabilidad: Definir el contrato para la persistencia de datos.
 * SOLID: Interface Segregation (ISP) y Dependency Inversion (DIP).
 * Java: Uso de Generics para escalabilidad.
 */
public interface IRepository<T> {
    void save(T entity);
    List<T> findAll();
    Optional<T> findById(String id);
    void delete(String id);
}

/**
 * Implementación base para repositorios en memoria.
 */
public abstract class MemoryRepository<T> implements IRepository<T> {
    protected List<T> items = new ArrayList<>();

    @Override
    public void save(T entity) {
        items.add(entity);
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(items);
    }
}
