package com.ativosfinanceiros.api.repositories;


import com.ativosfinanceiros.api.entities.StockPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<StockPosition,Long> {

}
